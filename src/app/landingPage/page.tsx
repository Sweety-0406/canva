import CarouselSection from "./components/carousel-section"
import FAQSection from "./components/faq-section"
import Feature from "./components/feature"
import CommentSection from "./components/comment-section"
import HeroPage from "./components/heroPage"
import LandingPageArea from "./components/landing-page-area"
import Navbar from "./components/navbar"
import Template from "./components/template"
import TextSection from "./components/text-section"
import FooterSection from "./components/footer-section"

const LandingPage = ()=>{
    return(
        <div className="overflow-x-hidden ">
            <div>
                <Navbar />
                <HeroPage />
                <Feature />
                <Template />
                <LandingPageArea />
                <CarouselSection />
                <TextSection />
                <FAQSection />
                <CommentSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default LandingPage