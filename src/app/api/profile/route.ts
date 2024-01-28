interface Profile {
    username: string;
    name: string;
    email: string;
    token?: string;
}

const profiles: Array<Profile> = [
    { username: 'admin', name: 'Walter White', email: 'walterhwhite@gmail.com', token: '123' }
]

export async function GET(request: Request) {
    const authToken = request.headers?.get('Authorization')?.replace('Bearer ', '')
    if (!authToken) return new Response("Unauthorized", { status: 401 });
    
    const profile = profiles.find(p => p.token === authToken)

    if (profile) {
        const data = { ...profile };
        delete data.token;
        return new Response(JSON.stringify(data), { status: 200 });
    } else {
        return new Response('Not Found', { status: 404 });
    }
}