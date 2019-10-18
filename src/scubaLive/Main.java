package scubaLive;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Table table = new Table();
//		for(int i = 0; i < table.padi.length; i++) {
//			for(int j = 0; j < table.padi[i].length; j++) {
//				System.out.println(table.padi[i][j]);
//			}
//			
//		}
		char endPg = table.getEndingPressureGroup('E', 400);
		System.out.println("end "+endPg);
		endPg = table.getEndingPressureGroup('4', 5);
		System.out.println("end "+endPg);
		char A = 'B';
		int a = A-65;
//		System.out.println(a/2);
//		System.out.println(a);
		a = a + 65;
		char B = (char) a;
//		System.out.println(B);
	}

}
