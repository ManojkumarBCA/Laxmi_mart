import Features from './Features'
import Fromourblog from './Fromourblog'
import HomeNewslatter from './HomeNewslatter'
import HomepageCarsole from './HomepageCarsole'
import Homepagecards from './Homepagecards'
import NeeArrivels from './NeeArrivels'
import ShopbyBrand from './ShopbyBrand'
import Trandingsection from './Trandingsection'

export default function HomePage() {
  return (
    <>
      <HomepageCarsole />
      <Homepagecards />
      <div className=' container mt-2'>
        <hr></hr>
      </div>
      
      <Trandingsection />
      <Features />
      <NeeArrivels />
      <div className=' container mt-2'>
        <hr></hr>
      </div>
      <ShopbyBrand />
      <HomeNewslatter />
      <Fromourblog />

    </>


  )
}
