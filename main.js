document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger)

	const IMAGE_BANNER = document.querySelector(".image-banner")

	function textErase(row) {
		const text = row.querySelector(".txt")
		if (!text.dataset.orig) {
			text.dataset.orig = text.textContent
		}
		text.textContent = ""
	}

	function logoToText(row) {
		const img = row.querySelector("img")
		const text = row.querySelector(".txt")
		gsap.set(img, { autoAlpha: 0 })
		text.textContent = text.dataset.orig
		gsap.set(text, { autoAlpha: 0.5 })
	}

	function changeImage(row) {
		IMAGE_BANNER.src = row.dataset.image
	}

	document.fonts.ready.then(() => {
		const wrapper = document.querySelector(".list-wrapper")
		const rows = gsap.utils.toArray(".row")

		rows.forEach(row => {
			// Animation of each row Logo to Text
			gsap.to(row, {
				opacity: 1,
				duration: 0.1,
				scrollTrigger: {
					trigger: row,
					markers: false,
					start: "top 50%",
					end: "bottom 50%",
					onEnter: () => {
						textErase(row)
						gsap.set(row.querySelector("img"), { autoAlpha: 1 })
						changeImage(row)
					},
					onLeave: () => {
						logoToText(row)
						changeImage(row)
					},
					onEnterBack: () => {
						textErase(row)
						gsap.set(row.querySelector("img"), { autoAlpha: 1 })
						changeImage(row)
					},
					onLeaveBack: () => {
						logoToText(row)
						changeImage(row)
					},
				}
			})
		})

		// Visibility for the image banner
		gsap.set(wrapper, {
			scrollTrigger: {
				trigger: wrapper,
				start: "top 50%",
				end: "bottom 50%",
				markers: false,
				onToggle: (self) => {
					gsap.set(IMAGE_BANNER, {
						autoAlpha: self.isActive ? 1 : 0,
						duration: 0.3
					})
				}
			}
		})
	})
})
