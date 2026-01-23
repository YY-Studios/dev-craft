export const ApiError = class extends Error {
  status: number;

  constructor(status: number, message: string) {
    // ApiError는 Error를 상속하고 있다. super(message) = Error(message)를 실행한다는 뜻
    // Error의 기본 기능(메시지·스택)을 살려주는 호출
    super(message);
    this.status = status;
  }
};

export const isApiError = (e: unknown): e is InstanceType<typeof ApiError> => e instanceof ApiError;
