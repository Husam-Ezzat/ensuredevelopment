
import { RouteObject } from "react-router-dom"
import AppLayout from "./AppLayout"
import ProtectedRoute from "@/utils/ProtectedRoute"
import Home from "@/pages/Home"
const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute roles={['Admin', 'Member', 'Moderator']}>
                        <Home />
                    </ProtectedRoute>
                )
            },

        ]
    }
]

export default routes;