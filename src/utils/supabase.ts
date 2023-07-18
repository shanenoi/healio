export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            bac_sy: {
                Row: {
                    chuyen_khoa: string | null
                    created_at: string | null
                    deleted_at: string | null
                    id: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    chuyen_khoa?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    chuyen_khoa?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'bac_sy_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
            bac_sy_loai_kham: {
                Row: {
                    bac_sy_id: string
                    created_at: string | null
                    deleted_at: string | null
                    loai_kham_id: string
                    updated_at: string | null
                }
                Insert: {
                    bac_sy_id: string
                    created_at?: string | null
                    deleted_at?: string | null
                    loai_kham_id: string
                    updated_at?: string | null
                }
                Update: {
                    bac_sy_id?: string
                    created_at?: string | null
                    deleted_at?: string | null
                    loai_kham_id?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'bac_sy_loai_kham_bac_sy_id_fkey'
                        columns: ['bac_sy_id']
                        referencedRelation: 'bac_sy'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'bac_sy_loai_kham_loai_kham_id_fkey'
                        columns: ['loai_kham_id']
                        referencedRelation: 'loai_kham'
                        referencedColumns: ['id']
                    }
                ]
            }
            benh_an: {
                Row: {
                    bac_sy_id: string | null
                    benh_nhan_id: string | null
                    chan_doan: string | null
                    created_at: string | null
                    id: string
                    ngay_lap: string | null
                }
                Insert: {
                    bac_sy_id?: string | null
                    benh_nhan_id?: string | null
                    chan_doan?: string | null
                    created_at?: string | null
                    id?: string
                    ngay_lap?: string | null
                }
                Update: {
                    bac_sy_id?: string | null
                    benh_nhan_id?: string | null
                    chan_doan?: string | null
                    created_at?: string | null
                    id?: string
                    ngay_lap?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'benh_an_bac_sy_id_fkey'
                        columns: ['bac_sy_id']
                        referencedRelation: 'bac_sy'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'benh_an_benh_nhan_id_fkey'
                        columns: ['benh_nhan_id']
                        referencedRelation: 'benh_nhan'
                        referencedColumns: ['id']
                    }
                ]
            }
            benh_an_thuoc: {
                Row: {
                    benh_an_id: string
                    created_at: string | null
                    deleted_at: string | null
                    kham_benh_id: string
                    so_luong: number
                    thuoc_id: string
                    updated_at: string | null
                }
                Insert: {
                    benh_an_id: string
                    created_at?: string | null
                    deleted_at?: string | null
                    kham_benh_id: string
                    so_luong: number
                    thuoc_id: string
                    updated_at?: string | null
                }
                Update: {
                    benh_an_id?: string
                    created_at?: string | null
                    deleted_at?: string | null
                    kham_benh_id?: string
                    so_luong?: number
                    thuoc_id?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'benh_an_thuoc_benh_an_id_fkey'
                        columns: ['benh_an_id']
                        referencedRelation: 'benh_an'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'benh_an_thuoc_kham_benh_id_fkey'
                        columns: ['kham_benh_id']
                        referencedRelation: 'kham_benh'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'benh_an_thuoc_thuoc_id_fkey'
                        columns: ['thuoc_id']
                        referencedRelation: 'thuoc'
                        referencedColumns: ['id']
                    }
                ]
            }
            benh_nhan: {
                Row: {
                    bhyt: string | null
                    created_at: string | null
                    deleted_at: string | null
                    id: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    bhyt?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    bhyt?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'benh_nhan_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
            hoa_don: {
                Row: {
                    created_at: string | null
                    deleted_at: string | null
                    id: string
                    kham_benh_id: string
                    phuong_thuc: string
                    tien_kham: number | null
                    tong_so_tien: number
                    trang_thai: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    kham_benh_id: string
                    phuong_thuc: string
                    tien_kham?: number | null
                    tong_so_tien: number
                    trang_thai: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    kham_benh_id?: string
                    phuong_thuc?: string
                    tien_kham?: number | null
                    tong_so_tien?: number
                    trang_thai?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'hoa_don_kham_benh_id_fkey'
                        columns: ['kham_benh_id']
                        referencedRelation: 'kham_benh'
                        referencedColumns: ['id']
                    }
                ]
            }
            kham_benh: {
                Row: {
                    bac_sy_id: string
                    benh_nhan_id: string
                    created_at: string | null
                    deleted_at: string | null
                    duration: number | null
                    id: string
                    loai_kham_id: string
                    ngay_gio: string
                    note: string | null
                    so_thu_tu: number
                    trang_thai: string
                    updated_at: string | null
                }
                Insert: {
                    bac_sy_id: string
                    benh_nhan_id: string
                    created_at?: string | null
                    deleted_at?: string | null
                    duration?: number | null
                    id?: string
                    loai_kham_id: string
                    ngay_gio: string
                    note?: string | null
                    so_thu_tu: number
                    trang_thai: string
                    updated_at?: string | null
                }
                Update: {
                    bac_sy_id?: string
                    benh_nhan_id?: string
                    created_at?: string | null
                    deleted_at?: string | null
                    duration?: number | null
                    id?: string
                    loai_kham_id?: string
                    ngay_gio?: string
                    note?: string | null
                    so_thu_tu?: number
                    trang_thai?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'kham_benh_bac_sy_id_fkey'
                        columns: ['bac_sy_id']
                        referencedRelation: 'bac_sy'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'kham_benh_benh_nhan_id_fkey'
                        columns: ['benh_nhan_id']
                        referencedRelation: 'benh_nhan'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'kham_benh_loai_kham_id_fkey'
                        columns: ['loai_kham_id']
                        referencedRelation: 'loai_kham'
                        referencedColumns: ['id']
                    }
                ]
            }
            loai_kham: {
                Row: {
                    created_at: string | null
                    deleted_at: string | null
                    id: string
                    ten: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    ten: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    ten?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar: string | null
                    created_at: string | null
                    deleted_at: string | null
                    email: string | null
                    first_name: string | null
                    id: string
                    last_name: string | null
                    phone: string | null
                    updated_at: string | null
                    user_type: string | null
                }
                Insert: {
                    avatar?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    email?: string | null
                    first_name?: string | null
                    id: string
                    last_name?: string | null
                    phone?: string | null
                    updated_at?: string | null
                    user_type?: string | null
                }
                Update: {
                    avatar?: string | null
                    created_at?: string | null
                    deleted_at?: string | null
                    email?: string | null
                    first_name?: string | null
                    id?: string
                    last_name?: string | null
                    phone?: string | null
                    updated_at?: string | null
                    user_type?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'profiles_id_fkey'
                        columns: ['id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            schema_migrations: {
                Row: {
                    dirty: boolean
                    version: number
                }
                Insert: {
                    dirty: boolean
                    version: number
                }
                Update: {
                    dirty?: boolean
                    version?: number
                }
                Relationships: []
            }
            tai_kham: {
                Row: {
                    benh_an_id: string
                    created_at: string | null
                    deleted_at: string | null
                    id: string
                    ngay: string
                    updated_at: string | null
                }
                Insert: {
                    benh_an_id: string
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    ngay: string
                    updated_at?: string | null
                }
                Update: {
                    benh_an_id?: string
                    created_at?: string | null
                    deleted_at?: string | null
                    id?: string
                    ngay?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'tai_kham_benh_an_id_fkey'
                        columns: ['benh_an_id']
                        referencedRelation: 'benh_an'
                        referencedColumns: ['id']
                    }
                ]
            }
            thuoc: {
                Row: {
                    created_at: string | null
                    deleted_at: string | null
                    don_vi: string
                    gia: number
                    id: string
                    ten: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    deleted_at?: string | null
                    don_vi: string
                    gia: number
                    id?: string
                    ten: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    deleted_at?: string | null
                    don_vi?: string
                    gia?: number
                    id?: string
                    ten?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
