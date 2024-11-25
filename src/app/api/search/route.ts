import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.HOTPEPPER_API_KEY;
const BASE_URL = process.env.HOTPEPPER_BASE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const keyword = searchParams.get('keyword');
  const range = searchParams.get('range');
  const count = searchParams.get('count');
  try {
    let url = `${BASE_URL}?key=${API_KEY}&lat=${latitude}&lng=${longitude}&range=${range}&count=${count}&format=json`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }

    const requestData = await axios.get(url);
    const responseData = requestData.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    
  }
}
