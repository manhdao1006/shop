# Router Configuration

Cấu trúc router được tổ chức như sau:

## Files

- `index.ts` - File chính export router instance
- `routes.ts` - Định nghĩa tất cả routes
- `guards.ts` - Navigation guards và middleware
- `types.ts` - Type definitions cho router

## Cách sử dụng

### Thêm route mới

1. Import component trong `routes.ts`
2. Thêm route vào array `routes`
3. Định nghĩa meta data nếu cần

### Thêm navigation guard

1. Thêm logic vào `guards.ts`
2. Đảm bảo guard được gọi trong `setupRouterGuards`

### Sử dụng router trong component

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/path')
```

## Cấu trúc route

```typescript
{
  path: '/path',
  name: 'RouteName',
  component: Component,
  meta: {
    title: 'Page Title',
    requiresAuth: false,
    layout: 'default'
  }
}
```
