import FloatingAssets from "@/components/floating-assets/floating-assets";
import "./about.scss";

export default function About() {
	return (
		<div className="about">
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
				<a
					href="https://github.com/ritikbhasarkar"
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
					href="https://www.linkedin.com/in/ritikbhasarkar"
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
					href="https://x.com/ritikbhasarkar"
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
				<a href="mailto:ritik@example.com" aria-label="Email">
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
