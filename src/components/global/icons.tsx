import { cn } from '@/lib/utils/cn';

export const ICONS = {
  figma: ({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) => (
    <svg className={cn('size-5 stroke-current stroke-2', className)} viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' {...props}>
      <title> </title>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.3201 0H31.6799C36.4495 0 40.32 3.8705 40.32 8.64006C40.32 11.9825 38.4192 14.8832 35.6403 16.3199C38.4192 17.7567 40.32 20.6576 40.32 23.9999C40.32 28.7695 36.4495 32.64 31.6799 32.64C28.9668 32.64 26.5446 31.3876 24.9602 29.4298V39.3599C24.9602 44.1295 21.0897 48 16.3201 48C11.5505 48 7.67999 44.1295 7.67999 39.3599C7.67999 36.0175 9.58077 33.1167 12.3597 31.6799C9.58077 30.2432 7.67999 27.3423 7.67999 23.9999C7.67999 20.6576 9.58075 17.7567 12.3597 16.3199C9.58076 14.8832 7.67999 11.9825 7.67999 8.64006C7.67999 3.8705 11.5505 0 16.3201 0ZM9.59999 8.64006C9.59999 4.9309 12.6109 1.92 16.3201 1.92H23.0398V15.3599H16.3201L16.2993 15.3599C12.5996 15.3487 9.59999 12.3422 9.59999 8.64006ZM23.0402 23.9086C23.0399 23.939 23.0398 23.9694 23.0398 23.9999C23.0398 24.0304 23.0399 24.0609 23.0402 24.0913V30.7198H16.3201C12.6109 30.72 9.59999 27.7091 9.59999 23.9999C9.59999 20.2977 12.5997 17.2911 16.2995 17.2799L16.3201 17.2799H23.0398L23.0402 23.9086ZM24.9602 24.0804V23.9195C25.0033 20.2565 27.9826 17.2947 31.6523 17.2799H31.6799C31.6868 17.2799 31.6936 17.2799 31.7005 17.2799C35.4003 17.2911 38.4 20.2977 38.4 23.9999C38.4 27.7091 35.3891 30.72 31.6799 30.72C27.9975 30.72 25.0034 27.7526 24.9602 24.0804ZM26.2505 17.2799C25.7765 17.6635 25.3438 18.0961 24.9602 18.5701V17.2799H26.2505ZM31.7007 15.3599C31.6938 15.3599 31.6868 15.3599 31.6799 15.3599C31.6694 15.3599 31.6589 15.3599 31.6484 15.3599H24.9602V1.92H31.6799C35.3891 1.92 38.4 4.9309 38.4 8.64006C38.4 12.3422 35.4004 15.3487 31.7007 15.3599ZM16.3201 32.6399C12.6109 32.6399 9.59999 35.6508 9.59999 39.3599C9.59999 43.0691 12.6109 46.08 16.3201 46.08C20.0293 46.08 23.0402 43.0691 23.0402 39.3599V32.6399H16.3201Z'
        fill='currentColor'
      />
    </svg>
  ),
};
