import { getSheetData } from './utils/google';

export default async function Home() {
  const today = await getSheetData({ sheetName: '2024.04' });

  return <main></main>;
}
