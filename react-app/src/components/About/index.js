import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/session';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';
import Collapsible from 'react-collapsible';

import "./About.css"

import landingImage from '../../landing-image.png'
import faq_art from '../../images/FAQ.png'


const About = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory()

  if (!user) {
    history.push(`/`)

  }

  return (

    <div className='splash-description about_wrapper align-left'>

      <h2 className='about_title'>About Perfect Fit</h2>
      <p className='about_p'>My name is Jacob Nicotra, and I built Perfect Fit after
        finding myself usure of what to do with my completed puzzles.
        I thought it would be nice to use a seamless online platform which facilitates puzzle swapping. That way, I could reduce waste,
        give someone else the chance to enjoy my puzzle, and try a new puzzle myself.
        I hope you enjoy this site!

      </p>

      <span className='q_and_art_holder'>

        <div id='left_about'>
      <h2 className='about_title' id='faq_title'>Frequently Asked Questions (FAQs)</h2>

          <ul id='faqs'>
            <li className='li-nostyle'>

              <Collapsible trigger="Do I have to swap puzzles?">
                <p className='open_about_para'>
                  No. If you would like to acquire a puzzle you found on the explore page, you would need to initiate a swap exchange. However, if you don’t have a puzzle to exchange with, you may consider ordering a brand new puzzle in our Custom Order tab.

                </p>
              </Collapsible>

            </li>

            <li className='li-nostyle'>

              <Collapsible trigger="How do I list my puzzle?">
                <p className='open_about_para'>
                  When you create an account, click on the My Profile tab and then the + icon to add a new puzzle. Once you complete all fields and upload your puzzle, other members will be able to see your puzzle on the Explore feed.

                </p>
              </Collapsible>

            </li>



            <li className='li-nostyle'>

              <Collapsible trigger="How do I initiate a swap?">
                <p className='open_about_para'>
                  Once you’ve found a puzzle you’d like to acquire, click on Initiate Swap. The owner of the puzzle will receive a swap request message and they have the choice to either approve or deny the puzzle exchange.

                </p>
              </Collapsible>

            </li>


            <li className='li-nostyle'>

              <Collapsible trigger="I shipped my puzzle but didn’t receive one in return.">
                <p className='open_about_para'>
                  If a member does not ship out a puzzle they agreed to exchange with, the member’s account will be suspended until the delinquent puzzle is shipped. Please email any complaints to nicotra100@gmail.com.

                </p>
              </Collapsible>

            </li>


            <li className='li-nostyle'>

              <Collapsible trigger="How do I report an issue?">
                <p className='open_about_para'>
                  If you have are experiencing any issues with this site or the service, please send an email to nicotra1008@gmail.com

                </p>
              </Collapsible>

            </li>

            <li className='li-nostyle'>

              <Collapsible trigger="A puzzle I swapped for is missing pieces">
                <p className='open_about_para'>
                  Any member who swaps an incomplete puzzle will be suspended, until they return your original puzzle. Please email any complaints to nicotra100@gmail.com.

                </p>
              </Collapsible>

            </li>


          </ul>
          <h2 className='about_title'>Techonologies used</h2>
          <p className='about_p'>
            JavaScript, Python, React - Redux, Flask, PostgreSQL, SQAlchemy, HTML5, CSS3

          </p>
          <h2 className='about_title' id='artwork_attributions'>Artwork Attributions</h2>
          <p className='about_p'>
            Logo by Monkik & artwork by Victoria Chepkasova

          </p>
        </div>

        <img src={faq_art} id='faq_art'>
        </img>
      </span>







    </div >

  )
  return (
    <Collapsible trigger="Start here">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
    </Collapsible>
  );

}

export default About
