import { NextResponse } from 'next/server'
import axios from 'axios'

//TODO: http://localhost:3000/api/cep/54759-105

export interface CepResponse {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    erro?: boolean
  }

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cep: string }> },
) {
    const { cep } = await params
  try {
    const { data } = await axios.get<CepResponse>(
      `https://viacep.com.br/ws/${cep}/json/`
    )
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ erro: true } as CepResponse, { status: 500 })
  }
}