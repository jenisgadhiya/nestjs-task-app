import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {join} from 'path'
import * as config from 'config'

const dbconfig=config.get('db')

export const typeormconfig:TypeOrmModuleOptions={
    'type':dbconfig.type,
    'host':process.env.RSD_HOSTNAME || dbconfig.host,
    'port':process.env.RSD_PORT ||dbconfig.port,
    'username':process.env.RSD_USERNAME || dbconfig.username,
    'password':process.env.RSD_PASSWORD || dbconfig.password,
    'database':process.env.RSD_DB_NAME || dbconfig.database,
    'entities':[join(__dirname,'../','**','*.entity.{ts,js}')],
    'synchronize':process.env.TYPEORM_SYNC || dbconfig.synchronize,
};