
function getAuthHeader(){
    const token = localStorage.getItem('accessToken');
        const authHeader = {
            headers:{
                Authorization: `${token}`
            }
        };
    return authHeader;
}

export {getAuthHeader};