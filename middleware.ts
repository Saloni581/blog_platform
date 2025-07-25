import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: ["/blog/new", "/dashboard/:path*", "/blog/:slug/edit", "/dashboard"],
};
