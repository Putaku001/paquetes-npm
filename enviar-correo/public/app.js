class EmailSender {
    constructor() {
        this.sendButton = document.getElementById('sendButton');
        this.recipientInput = document.getElementById('recipient');
        this.subjectInput = document.getElementById('subject');
        this.bodyInput = document.getElementById('body');

        this.sendButton.addEventListener('click', this.sendEmail.bind(this));
    }

    async sendEmail() {
        const recipient = this.recipientInput.value;
        const subject = this.subjectInput.value;
        const body = this.bodyInput.value;

        try {
            const response = await this.enviarCorreo(recipient, subject, body);
            console.log(response);
            alert('Correo enviado exitosamente.');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Error al enviar el correo.');
        }
    }

    async enviarCorreo(recipient, subject, body) {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recipient, subject, body })
        });

        return response.text();
    }
}


const emailSender = new EmailSender();
