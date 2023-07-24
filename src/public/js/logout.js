async function logout(){
    const obj = {
        logout: true
    };
    const response = await fetch('/api/logout', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    if (responseData.status === 'success') window.location.replace('/login');; 
}