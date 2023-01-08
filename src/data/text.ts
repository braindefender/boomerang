export interface TextResponse {
  status: 'success' | 'error';
  text: string;
}

export const getText = async () => {
  const res = await fetch("https://fish-text.ru/get?type=sentence&number=2&format=json");
  const data: TextResponse = await res.json()
  return data.text;
};
