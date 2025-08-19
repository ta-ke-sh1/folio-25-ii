export default class ControlService {
    private static instance: ControlService;

    private constructor() {
    }

    public static getInstance() {
        if (!ControlService.instance) {
            ControlService.instance = new ControlService();
        }
        return this.instance;
    }
}