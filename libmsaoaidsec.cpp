#include <algorithm>
#include <cstring>
#include<iomanip>
#include <iostream>
#include <ostream>
using namespace std;

int main()
{
   size_t v0;
   // 设置字节数 1或者4 当数据元素为4个字节时设1，为1个字节时设4
   // int type = 4;
   // unsigned int v21[18] = {
   //    0xFF,          
   //    0xD5,
   //    0xC0,
   //    0xFD,
   //    0xC6,
   //    0x84,
   //    0xF8,
   //    0xC0,
   //    0xCC,
   //    0xF7,
   //    0xD3,
   //       0,
   //       0
   // };
   int type = 1;
   unsigned int v21[18] = {
      0x78096707,          
      0x4206D9B3,
      0x46A799A9,
      0x7809D795,
      0x46B656B9,
      0x480799A9,
      0x7809A799,
      0x4639A9A7,
      0xA9A799A9
   };
   unsigned char* decode = reinterpret_cast<unsigned char*>(v21);
   v0 = strlen((const char *)decode);
   cout<<v0<<endl;
   unsigned short temp[] = {0x99,0xA7,0xA9};
   for(int i=0;i<80;i+=type){
      // unsigned short j = (unsigned short)*(decode +i);
      unsigned short j = (unsigned short)*(decode +i);
      unsigned short k = temp[i%3];
      cout<<(unsigned char)(j^k);
      // cout<<hex<<setfill('0')<<setw(2)<<(j^k)<<"";
   }
}