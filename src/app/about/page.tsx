import FloatingAssets from "@/components/floating-assets/floating-assets";
import HeroSvgs from "@/sections/hero-section/hero-svgs/hero-svgs";
import "./about.scss";

const About = () => {
	return (
		<div className="about">
			<FloatingAssets />
			<HeroSvgs />
			<div className="about--content">
				<div className="about--content--top">
					<div className="about--content--top--heading">
						Ritk Bhasarakar
					</div>
					<div className="about--content--top--description">
						<span className="about--content--top--description--text">
							Frontend Dev & wannabe Creative
						</span>
						<span className="about--content--top--description--subtext">
							Verb & Noun
						</span>
					</div>
				</div>
				<div className="about--content--bottom">
					<span>
						{" "}
						thoughtful process of crafting experiences that engage
						people, shape clarity, and spark delights.
					</span>
				</div>
			</div>
		</div>
	);
};

export default About;
