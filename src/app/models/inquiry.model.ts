import { DataRowOutlet } from "@angular/cdk/table"
import { User } from "./user.model"

export class Inquiry {
    inquiry_id?: number
    inquiry_title?: string
    inquiry_text?: string
    inquiry_creator?: User
    inquiry_created_at?: Date
    inquiry_updated_at?: Date
}

export class ToDo extends Inquiry {
    todo_assigned_to?: any
    todo_priority?: string
    todo_status?: string
    todo_category?: string
    todo_priority_name?: string
    todo_status_name?: string
    todo_category_name?: string
    comments?: Comment[]
}

export class Announcement extends Inquiry {
    announcement_is_visible?: boolean
    announcement_status?: string
    announcement_auto_invisible_date?: Date
    announcement_category?: string
    announcement_category_name?: string
    comments?: Comment[]
}

export class Notification extends Inquiry {
    notification_is_read?: boolean
    notification_recipient?: User
    notification_category?: string
    notification_category_name?: string
}

export class Poll extends Inquiry {
    //poll_open?: boolean
    poll_preliminary_results?: boolean
    poll_deadline?: Date
    vote_options?: VoteOption[]
}

export class VoteOption {
    id?: number
    poll?: Poll
    vote_option_text?: string
    votes?: Vote[]
    percentage?: number
}

export class Vote {
    voter?: User
    selected_option?: VoteOption
}

export class Comment {
    comment_id?: number
    inquiry?: number
    comment_text?: string
    comment_creator?: User
    comment_created_at?: Date
}

export class InquiryCategory {
    category_id?: number
    category_name?: string
}

export class ToDoStatus {
    status_id?: string
    status_name?: string
}

export class Info {
    info_title?: string
    info_text?: string
}