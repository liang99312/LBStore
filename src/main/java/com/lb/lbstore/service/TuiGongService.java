/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.TuiGong;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface TuiGongService {

    public TuiGong getTuiGongById(Integer id);
    
    public TuiGong getTuiGongDetailById(Integer id);
       
    public boolean updateTuiGong(TuiGong tuiGong);
    
    public String dealTuiGong(TuiGong tuiGong,Integer a01_id);
    
    public TuiGong saveTuiGong(TuiGong tuiGong);
    
    public boolean deleteTuiGong(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<TuiGong> queryTuiGongsByPage(HashMap map);

}
