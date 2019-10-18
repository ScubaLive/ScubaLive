package scubaLive;

import java.lang.*;

public class Table {
	
	int[][] padi;

	public Table() {
		// TODO Auto-generated constructor stub
		int[][] table = {
				{0,180},
				{0,47,48,228},
				{0,21,22,69,70,250},
				{0,8,9,30,31,78,79,259},
				{0,7,8,16,17,38,39,87,88,268},
				{0,7,8,15,16,24,25,46,47,94,95,275},
				{0,6,7,13,14,22,23,31,32,53,54,101,102,282},
				{0,5,12,13,20,21,28,29,37,38,59,60,107,108,288}
				
		};
		this.padi = table;
	}
	
	public char getEndingPressureGroup(char startingPressureGroup, int surfaceIntervalTime) {
		char endingPressureGroup = 0;
		System.out.println(startingPressureGroup);
		int startPg = startingPressureGroup - 65;
		System.out.println(startPg);
		System.out.println((char) (startPg+65));
		for (int i = 0; i < this.padi[startPg].length; i++) {
			if (this.padi[startPg][i] >= surfaceIntervalTime) {
				System.out.println(i);
				i = (int) Math.ceil((double)i/2.0);
				i--;
				System.out.println(i);
				startPg = startPg - i;
				System.out.println((char) startPg);
				startPg = startPg + 65;
				System.out.println((char) startPg);
				endingPressureGroup = (char) startPg;
				return endingPressureGroup;
			}
		}
		return endingPressureGroup;
	}
	
	public int getSurfaceIntervalTime(char startPg, char endPg) {
		
		return 1;
	}
	
}
