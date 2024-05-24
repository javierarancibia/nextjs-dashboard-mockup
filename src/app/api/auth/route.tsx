import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
    
        const data = await req.json();
        console.log(data);
    
        switch (action) {
            case 'login':
                // Handle login
                return handleLogin(data);
            case 'signup':
                // Handle signup
                return handleSignup(data);
            case 'logout':
                // Handle logout
                return handleLogout(data);
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }   
};

const handleLogin = (data: any) => {
    try {
        // Simulate token generation
        const token = '123';
        const response = NextResponse.json({ data: { ...data, token } });

        // Set the token cookie
        response.cookies.set('ValuadorToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error) {
        console.log(error)
    }
}

const handleSignup = (data: any): NextResponse => {
    // Implement your signup logic here
    return NextResponse.json({ message: 'User signed up successfully', data });
};
  
const handleLogout = (data: any): NextResponse => {
    const response = NextResponse.json({ message: 'User logged out successfully' });

    // Set the token cookie to an expired date to remove it
    response.cookies.set('ValuadorToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
    return response
};
