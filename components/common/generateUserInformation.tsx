import { User } from '@/components/deta'

export const generateUserInformation = (user: User) => {
    const emailPrefix = user.key.split('@')[0]
    const year = emailPrefix.substring(0, 2)
    const course = emailPrefix.match(/([a-z])+/g) || ''
    const roll = emailPrefix.split(course[0])[1]

    return {
        roll,
        year,
        course: course[0],
        prefix: emailPrefix
    }
}
