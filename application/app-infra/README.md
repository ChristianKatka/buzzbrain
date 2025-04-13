### KUINKA DEPLOY

cdk deploy -c env=staging
cdk deploy -c env=production

cdk deploy --all -c env=staging
cdk destroy --all -c env=staging

cdk deploy --all -c env=production

1. aja pelkkä AllBucketsStack
2. nyt voit ajaa CdnForAppStack. KOSKA cdn stäckki käyttää app buckettia ja se pitää olla olemassa ennenkö tämän voi ajaa
   Plus täytyy täytyy sit lisätä policy s3 bucketille käsin koska ei pysty kun read bucketin...
3. APP BUCKETILLE PITÄÄ KÄSIN LISÄTÄ POLICY userin saat cdn outputista
   {
   "Sid": "AllowCloudFrontOAI",
   "Effect": "Allow",
   "Principal": {
   "CanonicalUser": "8f9f89example7d8fb104a56c5f3exampled5571cf5a4d94a3989example"
   },
   "Action": "s3:GetObject",
   "Resource": "arn:aws:s3:::buzzbrain-staging---app/\*"
   }
4. mene angular-app kansioon. ota cloudforntist id lisää se readmehen sekä packacge.json
5. aja npm run deploy
6. deploy cognito
7. lisää constanteihi user pool id ja client id
8. päivitä myös lambdan envi tiedostoon
