import { ResponseType } from "@/types/Response_Types";

interface FetchsServicesProps {
  method: string;
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
}

export const fetchService = async (
  _props: FetchsServicesProps
): Promise<ResponseType> => {
  try {
    const baseHeaders: Record<string, string> = {
      ...(_props.headers || {}),
    };

    const fetchOptions: RequestInit = {
      method: _props.method,
      headers: baseHeaders,
    };

    if (_props.data) {
      if (_props.data instanceof FormData) {
        delete baseHeaders["Content-Type"];
        fetchOptions.body = _props.data;
      } else {
        baseHeaders["Content-Type"] = "application/json";
        fetchOptions.body = JSON.stringify(_props.data);
      }
    }

    const response = await fetch(
      `${process.env.SERVER_URL}${_props.endpoint}`,
      fetchOptions
    );

    const data = await response.json();

    return {
      code: response.status,
      data: data,
    };
  } catch (error) {
    console.error("Fetch service erorr ", error);
    return {
      code: 500,
      data: {
        status: "FAILED",
        error: "Request Failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};
