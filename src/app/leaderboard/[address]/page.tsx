import Navbar from '@/app/components/Navbar';
import ProfileComponent from '@/app/components/Profile/ProfileComponent';
import Footer from '@/app/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
};

interface Props {
  params: {
    address: `0x${string}`,
    icon: string
  }
}

const ProfileComponentPage = ({ params }: Props) => {
  return (
    <>
        <Navbar />
        <main>
            <div className='mx-auto flex bg-gray-900'>
                <div className='w-full mb-10 lg:mb-0 rounded-lg overflow-hidden'>
                    <ProfileComponent { ...params } />
                </div>
            </div>
            <Footer />
        </main>
    </>
  )
}

export default ProfileComponentPage;