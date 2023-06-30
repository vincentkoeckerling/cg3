let instance = null

export class ControlCenter {

	constructor() {
		if (instance !== null) return instance

		this.t = 0.5
		this.tValueInputs = Array.from(document.querySelectorAll('.t-value'))
		this.interval = null

		this.interpolationPointsVisible = false
		this.linesVisible = false
		
		this.tValueInputs.forEach(input => input.addEventListener('input', (e) => this.setT(parseFloat(e.currentTarget.value))))

		this.playButton = document.getElementById('play-button')
		this.playButton.addEventListener('click', this.onPlayButtonClicked.bind(this))

		document.getElementById('show-points').addEventListener('change', (e) => this.interpolationPointsVisible = e.currentTarget.checked)
		document.getElementById('show-lines').addEventListener('change', (e) => this.linesVisible = e.currentTarget.checked)

		instance = this
	}

	setT(newValue) {
		this.t = newValue
		this.tValueInputs.forEach(input => input.value = this.t)
	}

	onPlayButtonClicked() {
		if (this.interval === null) {
			this.interval = setInterval(() => this.setT((this.t + 0.001) % 1.0), 5)
			this.playButton.textContent = 'Pause'
			this.tValueInputs.forEach(input => input.disabled = true)
		} else {
			clearInterval(this.interval)
			this.interval = null
			this.playButton.textContent = 'Play'
			this.tValueInputs.forEach(input => input.disabled = false)
		}
	}
}