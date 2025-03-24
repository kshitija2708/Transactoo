import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between  bg-gradient-to-r from-purple-800 via-purple-400 to-purple-800 px-4">
        <div className="text-2xl  font-stretch-condensed text-white  flex flex-col justify-center">
            Transactoo
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button  onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}