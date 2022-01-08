import environment from '../../config/environment';

export type EmailTemplate = {
  subject: string;
  text: string;
};

export const welcomeEmail = (accessToken: string): EmailTemplate => ({
  subject: 'Bem vindo ao QuadraAqui!',
  text: `Obrigado por se juntar a rede QuadraAqui, em caso de dúvidas ou problemas entre em contato através do email lucassilvaennes@gmail.com.\n\nAcesse o seguinte link para validar a sua conta: ${
    environment.ACCOUNT_VALIDATION_URL + accessToken
  }\n\nEquipe QuadraAqui`,
});

export const forgotPasswordEmail = (accessToken: string): EmailTemplate => ({
  subject: 'Esqueceu a sua senha?',
  text: `Acesse o seguinte link para criar a sua nova senha: ${
    environment.FORGOT_PASSWORD_URL + accessToken
  }\n\nEquipe QuadraAqui`,
});

export const accountValidationEmail: EmailTemplate = {
  subject: 'Email confirmado com sucesso!',
  text: 'Agora você pode agendar quadras próximas de você de forma fácil através do site ou do aplicativo. Bons jogos!\n\nEquipe QuadraAqui.',
};
