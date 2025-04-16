const fetchClubData = async (userId, accessToken, refreshToken, acceptedScopes, expiresAt, clubId) => {
    try {
        const response = await fetch('https://ghwyrirvdi.execute-api.eu-north-1.amazonaws.com/dev/clubdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
            },
            body: JSON.stringify({
                userId,
                accessToken,
                refreshToken,
                acceptedScopes,
                expiresAt,
                clubId
            })
        });

        console.log('API Response Status:', response.status); // 🔍 Tulosta API:n HTTP-status

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch club data: ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data); // 🔍 Tulosta API:n palauttama data
        return data;
    } catch (error) {
        console.error('Error fetching club data:', error);
        throw error;
    }
};
