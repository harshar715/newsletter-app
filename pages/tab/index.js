import { useRouter } from 'next/router'

export default function RedirectTab({ ctx }) {
    const router = useRouter()
    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
        router.push('/tab/tday');
        return;
    }
}

RedirectTab.getInitialProps = ctx => {
    // We check for ctx.res to make sure we're on the server.
    if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/tab/today' });
        ctx.res.end();
    }
    return {};
}
