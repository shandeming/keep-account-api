import LoginService from '../service/LoginService';
import Credential from '../type/credential';
class LoginController {
	private loginService: LoginService;

	constructor() {
		this.loginService = new LoginService();
	}

	public async login(env: Env, { username, password }: Credential): Promise<Response> {
		const result = await this.loginService.login(username, password);
		if (result) {
			return new Response('Login successful', { status: 200 });
		} else {
			return new Response('Login failed', { status: 401 });
		}
	}
}
export default LoginController;
