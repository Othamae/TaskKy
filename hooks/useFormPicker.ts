import { defaultImages } from '@/const/images'
import { unsplash } from '@/lib/helpers/unsplash'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

export const useFormPicker = () => {
    const { pending } = useFormStatus()
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImageId, setSelectedImageId] = useState<any | null>(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                })
                if (result && result.response) {
                    const imagesCollection = result.response as Array<Record<string, any>>
                    setImages(imagesCollection)
                } else {
                    console.log('Failed to get images from Unsplash')
                }
            } catch (error) {
                console.log({ error })
            } finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [])

    const handleClick = (imageId: any) => {
        if (pending) return
        setSelectedImageId(imageId)
    }

    return {
        pending,
        images,
        isLoading,
        selectedImageId,
        handleClick
    }
}