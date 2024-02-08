'use server'

import { ERROR_SOMETHING_WRONG, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { ORGANIZATION } from '@/const/routes'
import { BILLING_ADDRESS_COLLECTION, CURRENCY, MODE, PAYMENT_TYPES, PRODUCT_DATA_DESCRIPTION, PRODUCT_DATA_NAME, QUANTITY, RECURRING_INTERVAL, UNIT_AMOUNT } from '@/const/stripe'
import { db } from '@/lib/db'
import { stripe } from '@/lib/helpers/stripe'
import { absoluteUrl } from '@/lib/utils'
import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { StripeRedirect } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	const user = await currentUser()
	if (!userId || !orgId || !user) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const settingsUrl = absoluteUrl(`${ORGANIZATION}/${orgId}`)
	let url = ''

	try {
		const orgSubscription = await db.orgSubscription.findUnique({
			where: { orgId }
		})

		if (orgSubscription && orgSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: orgSubscription.stripeCustomerId,
				return_url: settingsUrl,
			})

			url = stripeSession.url
		} else {
			const stripeSession = await stripe.checkout.sessions.create({
				success_url: settingsUrl,
				cancel_url: settingsUrl,
				payment_method_types: [PAYMENT_TYPES],
				mode: MODE,
				billing_address_collection: BILLING_ADDRESS_COLLECTION,
				customer_email: user.emailAddresses[0].emailAddress,
				line_items: [
					{
						price_data: {
							currency: CURRENCY,
							product_data: {
								name: PRODUCT_DATA_NAME,
								description: PRODUCT_DATA_DESCRIPTION
							},
							unit_amount: UNIT_AMOUNT,
							recurring: {
								interval: RECURRING_INTERVAL
							},
						},
						quantity: QUANTITY,
					},
				],
				metadata: {
					orgId,
				},
			})

			url = stripeSession.url || ""
		}
	} catch (error) {
		return {
			error: ERROR_SOMETHING_WRONG
		}
	}
	revalidatePath(`${ORGANIZATION}/${orgId}`)
	return { data: url }
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)
