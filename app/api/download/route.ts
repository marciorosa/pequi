import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  if (!file) {
    return NextResponse.json({ error: 'O parâmetro de arquivo é obrigatório' }, { status: 400 });
  }

  // Security: Only allow downloads from specific directories
  const allowedPaths = [
    'downloads/press-kit/press-releases',
    'downloads/press-kit/brand-assets',
    'downloads/press-kit/executive-photos',
    'downloads/press-kit/company-photos'
  ];

  const isAllowedPath = allowedPaths.some(allowedPath => file.startsWith(allowedPath));
  
  if (!isAllowedPath) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  try {
    const filePath = join(process.cwd(), 'public', file);
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);
    const fileName = file.split('/').pop() || 'download';
    
    // Determine content type based on file extension
    const getContentType = (filename: string) => {
      const ext = filename.split('.').pop()?.toLowerCase();
      switch (ext) {
        case 'pdf': return 'application/pdf';
        case 'png': return 'image/png';
        case 'jpg': case 'jpeg': return 'image/jpeg';
        case 'svg': return 'image/svg+xml';
        case 'eps': return 'application/postscript';
        case 'ico': return 'image/x-icon';
        case 'zip': return 'application/zip';
        default: return 'application/octet-stream';
      }
    };

    const contentType = getContentType(fileName);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
