import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.HOTPEPPER_API_KEY;

export async function GET() {
  try {
    const requestData = await axios.get(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}&keyword=寿司&format=json`);
    const responseData = requestData.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    
  }
}
