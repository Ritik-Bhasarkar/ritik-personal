import FloatingAssets from "@/components/floating-assets/floating-assets";
import ViewCounter from "@/components/view-counter/view-counter";
import links from "../../../public/links.json";
import "./about.scss";

export default function About() {
	return (
		<div className="about" id="about">
			<FloatingAssets />
			<div className="about--content">
				<div className="about--content--top">
					<div className="about--content--top--heading">
						Ritik B.
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
			<div className="about--socials">
				<ViewCounter />
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
				>
					<img
						src="/floating-assets/svgs/github-glyph.svg"
						alt="GitHub"
						loading="lazy"
						decoding="async"
					/>
				</a>
				<a
					href={links.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
				>
					<img
						src="/floating-assets/svgs/linkedin.svg"
						alt="LinkedIn"
						loading="lazy"
						decoding="async"
					/>
				</a>
				<a
					href={links.x}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X"
				>
					<img
						src="/floating-assets/svgs/x.svg"
						alt="X"
						loading="lazy"
						decoding="async"
					/>
				</a>
				<a href={links.email} aria-label="Email">
					<img
						src="/floating-assets/svgs/mail.svg"
						alt="Email"
						loading="lazy"
						decoding="async"
					/>
				</a>
			</div>
		</div>
	);
}
