import {type Database} from './supabase'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Thuoc = Database['public']['Tables']['thuoc']['Row'] | null
export const ThuocTable = 'thuoc'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Profiles = Database['public']['Tables']['profiles']['Row'] | null
export const ProfilesTable = 'profiles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type LoaiKham = Database['public']['Tables']['loai_kham']['Row'] | null
export const LoaiKhamTable = 'loai_kham'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type KhamBenh = Database['public']['Tables']['kham_benh']['Row'] | null
export const KhamBenhTable = 'kham_benh'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HoaDon = Database['public']['Tables']['hoa_don']['Row'] | null
export const HoaDonTable = 'hoa_don'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BenhNhan = Database['public']['Tables']['benh_nhan']['Row'] | null
export const BenhNhanTable = 'benh_nhan'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BenhAnThuoc = Database['public']['Tables']['benh_an_thuoc']['Row'] | null
export const BenhAnThuocTable = 'benh_an_thuoc'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BenhAn = Database['public']['Tables']['benh_an']['Row'] | null
export const BenhAnTable = 'benh_an'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BacSyLoaiKham = Database['public']['Tables']['bac_sy_loai_kham']['Row'] | null
export const BacSyLoaiKhamTable = 'bac_sy_loai_kham'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BacSy = Database['public']['Tables']['bac_sy']['Row'] | null
export const BacSyTable = 'bac_sy'
