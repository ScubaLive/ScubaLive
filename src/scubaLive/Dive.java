package scubaLive;

public class Dive {
	
	private DiveTable dtable;
	private int bottomt;
	private int ddepth;
	private char spg;
	private char fpg;
	private boolean ssrequired;
	private boolean safe;
	public int[] result;

	public Dive(DiveTable divt, SurfaceTable surft) {
		this.dtable = divt;
		bottomt = 0;
		ddepth = 0;
		spg = 'a';
		fpg = 'a';
		ssrequired = false;
		safe = true;
		result = null;
	}
	
	public void updateDive(int time, int depth, char startpg) {
		int maxbt = dtable.maxBT(startpg, depth);
		result = new int[]{time, depth, (int) startpg, (int) 'a', 0, 1};
		
		bottomt = time;
		ddepth = depth;
		spg = startpg;
		this.result [2] = startpg;
		
		//If time requested is past the maximum bottom time at depth & spg set return array to carry user recomendations for UI warnings
		if (maxbt < time) {
			safe = false;
			result[0] = maxbt;
			result[1] = dtable.maxDepth(time, startpg);
			result[5] = 0;
			// find new spg if possible
			if(startpg != 'a') {
				if (dtable.maxBT('a', depth) > time) {
					result[2] = dtable.minPG(time, depth);
					result[3] = dtable.diveFPG((char) result[2], depth, time);
					result[4] = dtable.ssTest((char) result[3], depth) ? 1 : 0;
				}
			}
		}
		else {
			fpg = dtable.diveFPG(startpg, depth, time);
			result[3] = fpg;
			ssrequired = dtable.ssTest(fpg, depth);
			result[4] = ssrequired ? 1 : 0;
		} 
		
	}
	
	public void updateDive(char startpg) {
		int maxbt = dtable.maxBT(startpg, ddepth);
		result = new int[]{bottomt, ddepth, (int) startpg, (int) 'a', 0, 1};
		
		spg = startpg;
		result [2] = startpg;
		
		//If time requested is past the maximum bottom time at depth & spg set return array to carry user recomendations for UI warnings
		if (maxbt < bottomt) {
			safe = false;
			result[0] = maxbt;
			result[1] = dtable.maxDepth(bottomt, startpg);
			result[5] = 0;
			// find new spg if possible
			if(startpg != 'a') {
				if (dtable.maxBT('a', ddepth) > bottomt) {
					result[2] = dtable.minPG(bottomt, ddepth);
					result[3] = dtable.diveFPG((char) result[2], ddepth, bottomt);
					result[4] = dtable.ssTest((char) result[3], ddepth) ? 1 : 0;
				}
			}
		}
		else {
			fpg = dtable.diveFPG(startpg, ddepth, bottomt);
			safe = true;
			result[3] = fpg;
			ssrequired = dtable.ssTest(fpg, ddepth);
			result[4] = ssrequired ? 1 : 0;
		} 
		
	}
	
	public boolean isSafe() {
		return safe;
	}
	
	public int getBT() {
		return bottomt;
	}
	
	public int getDepth() {
		return ddepth;
	}
	
	public char getSPG() {
		return spg;
	}
	
	public char getFPG() {
		return fpg;
	}
	
	public char getMPG() {
		return dtable.minPG(bottomt, ddepth);
	}
	
	public boolean getSS() {
		return ssrequired;
	}
	
	@Override
	public String toString() {
		String output = new String();
		
		return output;
	}
	
	public void draw() {
		
	}
}
