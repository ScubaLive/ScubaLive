package scubaLive;


public class DiveTable {

	//Pressure group 'a' is a pre-dive state
	//Indices for time and pressure are 1 to 26, 0 and 27 are for calculation purposes
	//Indices for depth are 0 to 11 
	//Expects depths between 0 and 40meters
	//Expects positive time in minutes only
	//Expects pressure groups A-Z and 'a'
	//Input validation to be done with UI
	
	private static int[][] divet;
	
	public DiveTable() {
		
		//dive table, 1st row is depths for columns, last row is index from which safety stops are required
		divet = new int[][]{
				{10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 42},
				{10, 9, 8, 7, 6, 6, 5, 4, 3, 3, -1, -1},
				{20, 17, 15, 13, 11, 10, 9, 8, 6, 5, 5, 4},
				{26, 23, 19, 17, 15, 13, 12, 10, 8, 7, 6, -1},
				{30, 26, 22, 19, 16, 15, 13, 11, 9, 8, -1, 6},
				{34, 29, 24, 21, 18, 16, 15, 13, 10 -1, 7, 7},
				{37, 32, 27, 23, 20, 18, 16, 14, 11, 9, 8, 8},
				{41, 35, 29, 25, 22, 20, 18, 15, 12, 10 , 9},
				{45, 38, 32, 27, 24, 21, 19, 17, 13, 11},
				{50, 42, 35, 29, 26, 23, 21, 18, 14, 12},
				{54, 45, 37, 32, 28, 25, 22, 19, 15, 13},
				{59, 49, 40, 34, 30, 26, 24, 21, 16, 14},
				{64, 53, 43, 37, 32, 28, 25, 22, 17},
				{70, 57, 47, 39, 34, 30, 27, 23, 19},
				{75, 62, 50, 42, 36, 32, 29, 25, 20},
				{82, 66, 53, 45, 39, 34, 30, 26},
				{88, 71, 57, 48, 41, 36, 32, 28},
				{95, 76, 61, 50, 43, 38, 34, 29},
				{104, 82, 64, 53, 46, 40, 36},
				{112, 88, 68, 56, 48, 32, 37},
				{122, 94, 73, 60, 51, 44},
				{133, 101, 77, 63, 53, 45},
				{145, 108, 82, 67, 55},
				{160, 116, 87, 70, 56},
				{178, 125, 92, 72},
				{199, 134, 98},
				{219, 147},
				{22, 22, 21, 20, 19, 17, 15, 13, 10, 7, 3, 2}
		};
	}
	
	private char indexToPG(int index) {
		char pg;
		
		if (index >= 1 && index <= 26) {
			index = index + 64;
			pg = (char) index;
		} else pg = 'a';
		
		return pg;
	}
	
	
	private int pgToIndex(char pg) {
		int index;
		
		if (pg != 'a') {
			index = (int) pg;
			if (index >= 65 && index <= 90) index = index - 64;
			else index = -1;
		} else index = 0;
			
		return index;
	}
	
	private int depthIndex(int depth) {
		int index = 0;
		
		for(; divet[0][index] < depth; index++);
		
		return index;
	}
	
	private int timeIndex(int bottomt, int indexd) {
		int index = 1;
		
		for(; divet[index][indexd] < bottomt; index++);
		
		return index;
	}
	
	private int[] offSet(char spg, int depth) {
		int ioffset = pgToIndex(spg);
		int toffset = 0;
		
		if(ioffset != 0) toffset = divet[ioffset][depthIndex(depth)];
		
		return new int[] {ioffset, toffset};
	}
	
	
	public char diveFPG(char spg, int depth, int bottomt) {
		int indexd = 0;
		int indext = 1;
		int[] offset = offSet(spg, depth);
		int ioffset = offset[0];
		int toffset = offset[1];
		char fpg = 'a';
		
		if( ioffset >= 0 && ioffset <= 26) {
			//find correct depth column 
			indexd = depthIndex(depth);

			//find pg for given bottom time
			indext = timeIndex(bottomt + toffset, indexd);
			
			fpg = indexToPG(indext);
		}

		return fpg; 
		
	}

	//Returns maximum bottom time from starting pressure group at a certain depth
	public int maxBT(char spg, int depth) {
		int indexd = depthIndex(depth);
		int indext = 1;
		int[] offset = offSet(spg, depth);
		int toffset = offset[1];
		int maxtindex = divet[27][indexd] + 4;
		int maxtime = divet[maxtindex][indexd];

		return maxtime - toffset;
	}
	
	public char minPG(int time, int depth) {
		int dindex = depthIndex(depth);
		int maxt = divet[divet[27][dindex] + 4][dindex];
		int tdiff = maxt - time;
		
		char spg = indexToPG(timeIndex(tdiff, dindex) - 1);
		
		return spg;
		
	}
	
	public int maxDepth(int time, char spg) {
		int indext = pgToIndex(spg);
		int indexd = 11;
		
		//skip depths in which dives from spg aren't allowed
		while (divet[27][indexd] + 4 < indext) 
			indexd--;

		//find depth which allows for BT at certain spg
		while(divet[divet[27][indexd]+4][indexd] < time + divet[indext][indexd])
			indexd--;
		
		return divet[0][indexd];
		
	}
	
	public boolean ssTest(char finalpg, int depth) {
		boolean ssrequired = false;
		int pgindex = pgToIndex(finalpg);
		int dindex = depthIndex(depth);
		
		if(pgindex >= 1 && pgindex <= 26) {
			if(pgindex > divet[27][dindex]) ssrequired = true;
			if( depth > 25) ssrequired = true;
		}
		
		return ssrequired;
	}

}
