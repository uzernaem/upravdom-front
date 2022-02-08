import { File } from "./inquiry.model"
import { serverUrl } from 'src/app/_services/baseurl';

export class User {
    id?: number
    username?: string
    first_name?: string
    last_name?: string
    email?: string
    phone_number?: string
    is_manager?: boolean
    photo?: File
    photo_url?: string
}