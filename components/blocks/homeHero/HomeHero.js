export default function HomeHero({userData}) {
    return (
        <>
            {
                userData.customerData?.firstName ?
                    <h2>Hi {userData.customerData.firstName}, welcome to the MindClass dashboard</h2>
                    :
                    <h3>Welcome to the MindClass dashboard</h3>
            }
            <p>We'll keep you up to date with the latest in Mental Health, so come back daily and see what's changed</p>
        </>
    )
}
