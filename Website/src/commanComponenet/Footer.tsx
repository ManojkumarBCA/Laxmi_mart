export default function Footer() {
  
  return (
    <footer className='footer mt-4'>
      <div className='container '>
        <div className='row'>
          <div className='col-md-4 footer__column '>
            <h5 className='text-white'>ABOUT US</h5>
            <div className='mt-3'>
              <p>Praesent dapibus, neque id cursus <br></br>ucibus, tortor neque egestas augue, <br></br>eu vulputate magna eros eu erat.</p>
            </div>
            <div className="flex-container text-center">
              <div >
                <a className='text-white '><i className="bi bi-facebook footericon p-2"></i></a>
              </div>
              <div >
                <a className='text-white '><i className="bi bi-twitter footericon p-2"></i></a>
              </div>
              <div >
                <a className='text-white '><i className="bi bi-instagram footericon p-2"></i></a>
              </div>
              <div >
                <a className='text-white '><i className="bi bi-youtube footericon p-2"></i></a>
              </div>
            </div>
          </div>
          <div className='col-md-4 footer__column'>
            <h5 className='text-white'>USEFUL LINKS</h5>
            <div className='mt-3'>
              <p className='footercolore'>About us</p>
              <p className='footercolore'>How to shop with us</p>
              <p className='footercolore'>Contact us</p>
            </div>
          </div>
          <div className='col-md-4 footer__column'>
            <h5 className='text-white'>CUSTOMER SERVICE</h5>
            <div className='mt-0'>
              <p className='footercolore'>Returns</p>
              <p className='footercolore'>Terms and conditions</p>
              <p className='footercolore'>Privacy Policy</p>
            </div>
          </div>
        </div>
        <hr className='mb-0 text-white'></hr>
        <div className='container'>
          <div className='row text-center '>
            <div className='mb-0 mt-0'>
              <p >Copyright © 2023 Laxmi Mart. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
