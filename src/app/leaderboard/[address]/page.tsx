import Navbar from '@/app/components/Navbar'
import ProfileComponent from '../../components/Profile/ProfileComponent'
import Footer from '@/app/components/Footer'

interface Props {
  params: {
    address: `0x${string}`,
    icon: string
  }
}

const Profile = ({ params }: Props) => {
  return (
    <>
        <main>
            {/* <Navbar /> */}
            <div className='mx-auto flex'>
                <div className='w-full mb-10 lg:mb-0 rounded-lg overflow-hidden'>
                    <ProfileComponent { ...params } />
                </div>
            </div>
            <Footer />
        </main>
    </>
  )
}

export default Profile;