


async function getUserProfile() {
    try {
        const res = await fetch('https://dev.wallex.world/cards/limitEnquiry?trans_type=POS&mobile_number=9620992993')

        const result = await res.json();
        console.log('GET Response:', result);

        if (res.ok) {
            return result;
        } else {
            throw new Error(result?.message || 'Failed to fetch profile');
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error gracefully
    }
}

getUserProfile()