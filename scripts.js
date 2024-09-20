const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const cep = document.getElementById("cep")
const cepForm = document.getElementById("cep-form")
const btnCepForm = document.getElementById("btn-cep-form")

function changeBtnCepForm() {
	if(btnCepForm.hasAttribute("disabled")) {
		btnCepForm.removeAttribute("disabled")
		return
	}

	btnCepForm.setAttribute("disabled", "")
	return
}

function checkFields() {
	if(rua.value.length === 0) {
		rua.removeAttribute("disabled")
	}

	if(numero.value.length === 0) {
		numero.removeAttribute("disabled")
	}

	if(bairro.value.length === 0) {
		bairro.removeAttribute("disabled")
	}

	if(cidade.value.length === 0) {
		cidade.removeAttribute("disabled")
	}

	if(estado.value.length === 0) {
		estado.removeAttribute("disabled")
	}
}

function findCEP(cep) {
	if(!isNaN(cep)) {
		fetch(`https://viacep.com.br/ws/${cep}/json`)
		.then((resp) => resp.json())
		.then((data) => {
			if(data.erro == "true") {
				alert("CEP Inválido! Fetch")
			} else {
				rua.value = data.logradouro
				bairro.value = data.bairro
				cidade.value = data.localidade
				estado.value = data.estado
				checkFields()
				changeBtnCepForm()
			}
		})
		.catch((err) => console.log(err))
	}
}

cep.onkeydown = (event) => {
	const numberRegex = /^\d+$/
	const cepSize = cep.value.length

	if(event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
		if(event.keyCode === 9 && cepSize === 8) {
		findCEP(cep.value)

		} else {
			if((!numberRegex.test(event.key) && event.key !== "Backspace" && event.keyCode !== 9) || (event.key !== "Backspace" && cepSize > 7 && event.keyCode !== 9)) {
				event.preventDefault()
			}
		}
	}
}

cepForm.addEventListener("submit", function(event) {
	const cepSize = cep.value.length
	if(cepSize < 8) {
		event.preventDefault()
		alert("CEP Inválido! Submit")
	} else {
		alert("Obrigado por testar o formulário")
	}
})

cep.addEventListener('input', function(event) {
	const numberRegex = /^\d+$/
	const cepSize = cep.value.length

	if(cepSize === 8) {
		findCEP(cep.value)
	}
})

numero.addEventListener("keypress", function(event) {
	if(event.key == "-" || event.key == ".") {
		event.preventDefault()
	}
})

