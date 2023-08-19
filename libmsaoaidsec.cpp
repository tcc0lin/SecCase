#include <algorithm>
#include <cstring>
#include <iostream>
#include <ostream>
using namespace std;

int main()
{
   size_t v0;
   unsigned int v21[15] = {
      2013882270,
      1107745203,
      1185388969,
      2013910933,
      1186354873,
      1208457641,
      2013898649,
      1178184103,
      -1448633943
   };
   unsigned char* decode = reinterpret_cast<unsigned char*>(v21);
   v0 = strlen((const char *)decode);
   cout<<v0<<endl;
   unsigned short temp[] = {0x99,0xA7,0xA9};
   for(int i=0;i<50;i++){
      unsigned short j = (unsigned short)*(decode +i);
      unsigned short k = temp[i%3];
      cout<<(unsigned char)(j^k);
   }
}